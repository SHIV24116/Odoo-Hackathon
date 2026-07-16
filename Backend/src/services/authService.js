const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/jwt");
const { isValidEmail, isNonEmptyString } = require("../utils/validators");

const publicUser = ({ password, ...user }) => user;

const signup = async (userData) => {
    const { name, email, password, roleId } = userData;
    if (!isNonEmptyString(name) || !isValidEmail(email) || !isNonEmptyString(password) || password.length < 8) {
        throw new Error("Name, a valid email, and a password of at least 8 characters are required");
    }
    const role = await prisma.role.findUnique({ where: { id: Number(roleId) } });
    if (!role) throw new Error("Selected role does not exist");

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            roleId: role.id,
        },
        include: { role: { select: { id: true, name: true } } },
    });

    return {
        success: true,
        message: "User registered successfully",
        user: publicUser(user),
    };
};

const login = async (userData) => {
    const { email, password } = userData;

    const user = await prisma.user.findUnique({
        where: { email },
        include: { role: { select: { id: true, name: true } } },
    });

    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = signToken({ id: user.id, roleId: user.roleId, role: user.role.name });

    return {
        success: true,
        token,
        user: publicUser(user),
    };
};

module.exports = {
    signup,
    login,
};

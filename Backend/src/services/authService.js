const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (userData) => {
    const { name, email, password, roleId } = userData;

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
            roleId,
        },
    });

    return {
        success: true,
        message: "User registered successfully",
        user,
    };
};

const login = async (userData) => {
    const { email, password } = userData;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("Invalid Email");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            roleId: user.roleId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );

    return {
        success: true,
        token,
        user,
    };
};

module.exports = {
    signup,
    login,
};
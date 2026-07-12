const authService = require("../services/authService");

const signup = async (req, res) => {
    try {
        const result = await authService.signup(req.body);

        return res.status(201).json(result);

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message,
        });

    }
};

const login = async (req, res) => {
    try {

        const result = await authService.login(req.body);

        return res.status(200).json(result);

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: err.message,
        });

    }
};

module.exports = {
    signup,
    login,
};
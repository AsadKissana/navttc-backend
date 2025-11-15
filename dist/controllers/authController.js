import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const session = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Unauthorized");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ success: true, data: decoded, error: null });
    }
    catch (error) {
        res.status(401).json({ success: false, data: null, error: error.message });
    }
};
export const signin = (req, res) => {
    try {
        const { username, password } = req.body;
        if (req.body.username !== "ADMIN") {
            throw new Error("User not found");
        }
        if (req.body.password !== "ROOT") {
            throw new Error("Invalid password");
        }
        const token = jwt.sign({ id: 1, username, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true
        });
        res.status(200).json({ success: true, error: null });
    }
    catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
};
export const signup = (req, res) => { };
export const signout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(401).json({ success: false });
    }
};
//# sourceMappingURL=authController.js.map
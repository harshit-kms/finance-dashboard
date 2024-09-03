const userSchema = require("../models/userModel.js")
{/*
exports.addUser = async (req, res) => {
    userSchema.create(req.body)
    .then(signUp => res.json(signUp))
    .catch(err=> res.json(err))
}
*/}


exports.logUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await userSchema.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'No record found.' });
        }
       

        if (password===user.password) {
            res.status(200).json({ message: 'Success', user: { id: user._id, firstName: user.firstName, lastName: user.lastName }});
        } else {
            res.status(400).json({ message: 'Incorrect password.' });
        }
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ message: 'Server error.' });
    }
};
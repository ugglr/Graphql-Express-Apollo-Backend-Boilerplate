import bcrypt from "bcrypt";
import { User } from "../../models/User";

// ########################################################################
// MUTATIONS
// ########################################################################

// MUTATION: Created a user with the given email and password
export const createUser = async (_, { email, password }) => {
  try {
    // Search for existing users
    const hasUser = await User.findOne({ email });
    if (hasUser) {
      throw new Error("User already exists");
    }
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create the new user object
    const newUser = new User({
      email: email,
      password: hashedPassword
    });
    // Saving the user to DB and storing the result from the save
    const saveResult = await newUser.save();
    // Do not return the hashed password
    saveResult.password = null;
    return saveResult;
  } catch (err) {
    throw err;
  }
};

// ########################################################################
// QUERIES
// ########################################################################

// QUERY: Returns all Users in the DB
export const users = async () => {
  try {
    const searchResult = await User.find();
    // searchResult.password = null;
    searchResult.map(user => {
      user.password = null;
    });
    return searchResult;
  } catch (err) {
    throw err;
  }
};

// QUERY: Find a user by email
export const findUserByEmail = async (_, { email }) => {
  try {
    const hasUser = await User.findOne({ email });
    if (!hasUser) {
      throw new Error("User not found");
    }
    // Don't return user passwords
    hasUser.password = null;
    return hasUser;
  } catch (err) {
    throw err;
  }
};

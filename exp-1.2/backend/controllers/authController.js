import jwt from "jsonwebtoken";

const users = [
  {
    id: 1,
    name: "Rahul",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "John",
    email: "editor@example.com",
    password: "123456",
    role: "editor",
  },
  {
    id: 3,
    name: "Alex",
    email: "viewer@example.com",
    password: "123456",
    role: "viewer",
  },
];

export const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    message: "Login Successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
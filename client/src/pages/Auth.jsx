import { useState } from "react";
import "../styles/auth.css";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    setName('slkfshvlshlvnhk;azn')
  };

  return (
    <div className="main-auth">
      <div>
        <div className="headings">
          <h2>Register Your Account !</h2>
          <p>Join our biggest community of developers !</p>
        </div>
        <form>
          <div>
            <input
              type="text"
              placeholder="Enter name here..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter email here..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password here..."
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button onClick={handleSubmit}>Sign Up</button>
        </form>
        <div className="links">
          <span>Already have an account ?</span>
          <span>Log In</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;

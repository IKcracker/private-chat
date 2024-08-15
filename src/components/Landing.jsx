import { useNavigate } from 'react-router-dom';

function Landing({ Name, Email, Tell, handleForm, handleInputs }) {
  const navigate = useNavigate();
  function handleForm(event) {
    event.preventDefault();
    navigate('/home');
  }

  return (
    <section className="landing">
      <form onSubmit={(event) => handleForm(event)} onChange={(event) => handleInputs(event.target)}>
        <input type="text" placeholder="Name" name="Name" value={Name} />
        <br />
        <input type="email" placeholder="Email" name="Email" value={Email} />
        <br />
        <input type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" placeholder="0XX XXX XXXX" name="Tell" value={Tell} />
        <div className="btn-box">
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}

export default Landing;

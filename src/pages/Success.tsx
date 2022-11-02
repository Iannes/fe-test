import { Message } from "../components/Message";

const Success = () => {
  return (
    <div className="fade-in success-page-container">
      <Message
        heading="Form has been submitted successfuly"
        message="We'll get back to you soon 🎉"
      />
    </div>
  );
};

export default Success;

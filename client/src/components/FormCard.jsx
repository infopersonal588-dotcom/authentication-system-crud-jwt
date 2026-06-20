const FormCard = ({ title, children }) => (
  <section className="card">
    <h2 className="section-title">{title}</h2>
    {children}
  </section>
);

export default FormCard;

import Layout from "../components/Layout";
import BookingComponent from "../pages/bookings/[id]";

const Bookings = () => (
  <Layout title="Bookings Page | Meals App">
    <BookingComponent />
  </Layout>
);

export default Bookings;
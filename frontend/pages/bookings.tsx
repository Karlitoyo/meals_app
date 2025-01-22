import Layout from "../components/Layout";
import BookingComponent from "../pages/bookings/[id]";

const Bookings = () => (
  <Layout title="Bookings Page | Venue App">
    <BookingComponent isAuthenticated={false} />
  </Layout>
);

export default Bookings;

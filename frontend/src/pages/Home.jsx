import ReferralForm from '../components/ReferralForm';
import Dashboard from './Dashboard';

export default function Home() {
  return (
    <div className="">
      <ReferralForm onSuccess={() => window.location.reload()} />
    </div>
  );
}

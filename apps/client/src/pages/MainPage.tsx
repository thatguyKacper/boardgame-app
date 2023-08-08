import { Suspense, lazy } from 'react';
import Loader from '../components/Loader';
import MainLayout from '../components/MainLayout';

const Jumbo = lazy(() => import("../components/Jumbo"));
const TopFeature = lazy(() => import("../components/TopFeature"));
const Categories = lazy(() => import("../components/Categories"));


export default function MainPage() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <Jumbo />
        <TopFeature />
        <Categories />
      </Suspense>
    </MainLayout>
  );
}

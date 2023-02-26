import MainLayout from "../components/MainLayout/MainLayout";
import { classNames, pagewrap } from "../utils";

export default function Index() {
  return (
    <MainLayout>
      <div className={classNames(pagewrap, "prose")}>
        {/*
          *
          if not logged in */}
        <h1>Ffynnon Home Page</h1>
        <p>signup/login</p>
      </div>
      {/* 
        *
        logged in */}
      {/* create org */}
      {/* select org */}
    </MainLayout>
  );
}

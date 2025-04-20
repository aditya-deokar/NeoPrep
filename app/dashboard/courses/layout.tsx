import { ReactNode, Suspense } from "react";
import { BarLoader } from "react-spinners";
import CourseHeader from "./_component/CourseHeader";


interface LayoutProps {
    children: ReactNode;
}


const CourseLayout: React.FC<LayoutProps> = ({ children }) => {
    return (


        <div
         
        >
            <CourseHeader/>

            <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}>
                {children}
            </Suspense>

        </div>



    );
};

export default CourseLayout;

import * as React from 'react';
import {Suspense} from "react";
import Loading from "@/app/schedule/loading";

const ProfileLayout = (props: {
    fullcalander: React.ReactNode;
    children: React.ReactNode}) => {
    return (
        <section>
            <div>Schedule</div>
            <Suspense fallback={<Loading/>}>
                <div>Inner page</div>
                {props.fullcalander}
            </Suspense>
        </section>
    )
}

export default ProfileLayout;


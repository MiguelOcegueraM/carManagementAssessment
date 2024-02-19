import CarList from "@/components/CarList";
import Header from "@/components/Header";
import React, {useState} from "react";

const App = () => {
    const [isDataUpdated, setDataUpdated] = useState(false);

    const dataIsUpdated = () => {
        setDataUpdated(true);
    };

    return(
        <>
            <Header dataUpdated={dataIsUpdated}/>
            <CarList isDataUpdated={isDataUpdated}/>
        </>
    );
};

export default App;
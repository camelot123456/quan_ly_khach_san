import React from "react";
import { useParams } from "react-router-dom";

function RoomDetailPublic() {

    const {idRoomtype} = useParams()
    console.log(idRoomtype)

    return (
        <>
            {idRoomtype}
        </>
    )

}

export default RoomDetailPublic
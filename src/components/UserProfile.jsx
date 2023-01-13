import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../utils/data";
import { client } from "../client";
import { AiOutlineLogout } from "react-icons/ai";
import MasonryLayout from "./MasonryLayout";

const randomImage = "http://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles = "bg-primary mr-4 text-black text-white font-bold p-2 rounded-full w-20 outline-none";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      });
  }, [userId]);
  useEffect(() => {
  if(text === 'created'){
  const createdPinsQuery = userCreatedPinsQuery(userId)

    client.fetch(createdPinsQuery)
      .then((data) => {
        setPins(data)
      })
  }else{
    const savedPinsQuery = userSavedPinsQuery(userId)

    client.fetch(savedPinsQuery)
      .then((data) => {
        setPins(data)
      })

  }
  },[text, userId])

  if (!user) {
    return <Spinner message={"Loading profile..."} />;
  }

  return (
    <div className={"relative pb-2 h-full justify-center items-center "}>
      <div className={"flex flex-col pb-5"}>
        <div className={"relative flex-col mb-7"}>
          <div className={"flex flex-col justify-center items-center"}>
            <img src={randomImage} alt="banner"
                 className={"w-full h-370 2x1:h-510 shadow-lg object-cover "} />
            <img src={user.image} alt="user-pic"
                 className={"rounded-full w-20 h-20 -mt-10 shadow-x1 object-cover "} />
            <h1 className={"font-bold text-3x1 text-center mt-3"}>
              {user.userName}
            </h1>
            <div className={"absolute top-0 z-1 right-0 p-2"}>
              {userId === user._id && (
                <button className={`bg-white p-2 rounded-full cursor-pointer
                 outline-none shadow-md`} onClick={() => {
                  localStorage.clear();

                  navigate("/login");
                }} type={"button"}>
                  <AiOutlineLogout color={"red"} fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className={"text-center mb-7 "}>
            <button type={"button"} className={`${activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles}`}
                    onClick={(e) => {
                      setText(e.target.textContext);
                      setActiveBtn("created");
                    }}
            >
              Created
            </button>
            <button type={"button"} className={`${activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles}`}
                    onClick={(e) => {
                      setText(e.target.textContext);
                      setActiveBtn("saved");
                    }}
            >
             Saved
            </button>
          </div>
          {pins?.length ? (
          <div className={'px-2'}>
            <MasonryLayout pins={pins}/>
          </div>
          ):(
            <div className={'flex justify-center font-bold items-center w-full text-x1 mt-2'}>No pins</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
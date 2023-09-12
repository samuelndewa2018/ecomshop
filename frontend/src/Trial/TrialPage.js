import React from "react";
import axios from "axios";
import { server } from "../server";

const TrialPage = () => {
  const Callback = async () => {
    console.log("yoooo");
    try {
      await axios.post(`${server}/mpesa/callback`, {});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={() => Callback()}
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Sign up
    </button>
  );
};

export default TrialPage;
// import React, { useState } from "react";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import axios from "axios";

// const schema = yup.object().shape({
//   address: yup.string().required("Address is required"),
// });

// function App() {
//   const [currentLocation, setCurrentLocation] = useState("");
//   const formik = useFormik({
//     initialValues: {
//       address: "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });

//   const handleGetCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log(latitude, longitude);
//           setCurrentLocation("Fetching location...");
//           const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
//           axios
//             .get(url)
//             .then((response) => {
//               setCurrentLocation(response.data.display_name);
//               formik.setFieldValue("address", response.data.display_name);
//             })
//             .catch((error) => {
//               console.error("Error fetching location:", error);
//               setCurrentLocation("Location fetch failed.");
//             });
//         },
//         (error) => {
//           console.error("Error getting current location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//           <label htmlFor="address">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formik.values.address}
//             onChange={formik.handleChange}
//           />
//           {formik.errors.address && formik.touched.address && (
//             <p>{formik.errors.address}</p>
//           )}
//         </div>
//         <button type="button" onClick={handleGetCurrentLocation}>
//           Use Current Location
//         </button>
//         <button type="submit">Submit</button>
//       </form>
//       {currentLocation && (
//         <div>
//           <p>Current Location:</p>
//           <p>City: {currentLocation.split(",")[0]}</p>
//           <p>State: {currentLocation.split(",")[1]}</p>
//           <p>Country: {currentLocation.split(",")[2]}</p>
//           <p>Postal Code: {currentLocation.split(",")[3]}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

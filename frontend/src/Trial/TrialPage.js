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

import React from "react";

const TrialPage = () => {
  return (
    <div>
      {" "}
      <div class="rounded mt-3">
        <div class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div class="relative">
            <div class="h-[50vh] bg-slate-200 rounded animate-stripes p-10">
              <div class="preloader">
                <svg
                  class="cart"
                  role="img"
                  aria-label="Shopping cart line animation"
                  viewBox="0 0 128 128"
                  width="128px"
                  height="128px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
                  >
                    <g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
                      <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                      <circle cx="43" cy="111" r="13" />
                      <circle cx="102" cy="111" r="13" />
                    </g>
                    <g class="cart__lines" stroke="currentColor">
                      <polyline
                        class="cart__top"
                        points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                        stroke-dasharray="338 338"
                        stroke-dashoffset="-338"
                      />
                      <g class="cart__wheel1" transform="rotate(-90,43,111)">
                        <circle
                          class="cart__wheel-stroke"
                          cx="43"
                          cy="111"
                          r="13"
                          stroke-dasharray="81.68 81.68"
                          stroke-dashoffset="81.68"
                        />
                      </g>
                      <g class="cart__wheel2" transform="rotate(90,102,111)">
                        <circle
                          class="cart__wheel-stroke"
                          cx="102"
                          cy="111"
                          r="13"
                          stroke-dasharray="81.68 81.68"
                          stroke-dashoffset="81.68"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <div class="preloader__text">
                  <p class="preloader__msg">Bringing you the product…</p>
                  <p class="preloader__msg preloader__msg--last">
                    This is taking long. Something's wrong.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialPage;

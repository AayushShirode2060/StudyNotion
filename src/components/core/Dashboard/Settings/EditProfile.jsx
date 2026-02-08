import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  // Set initial values when user data loads
  useEffect(() => {
    if (user) {
      setValue("firstName", user?.firstName || "")
      setValue("lastName", user?.lastName || "")
      setValue("dateOfBirth", user?.additionalDetails?.dateOfBirth || "")
      setValue("gender", user?.additionalDetails?.gender || "")
      setValue("contactNumber", user?.additionalDetails?.contactNumber || "")
      setValue("about", user?.additionalDetails?.about || "")
    }
  }, [user, setValue])

  const submitProfileForm = (data) => {
    // Send data at root level as backend expects
    const restructuredData = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      contactNumber: data.contactNumber,
      about: data.about,
    }
    console.log("Sending profile update data:", restructuredData)
    dispatch(updateProfile(token, restructuredData))
    // Navigate back to profile after a short delay to allow toast to show
    setTimeout(() => {
      navigate("/dashboard/my-profile")
    }, 1500)
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style text-richblack-5">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style bg-richblack-700 text-richblack-200 px-8 py-3 rounded-lg border-b border-b-richblack-200 "
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style text-richblack-5">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style  bg-richblack-700 text-richblack-200 px-8 py-3 rounded-lg border-b border-b-richblack-200 "
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style text-richblack-5">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style  bg-richblack-700 text-richblack-200 px-8 py-3 rounded-lg border-b border-b-richblack-200 "
                {...register("dateOfBirth", {
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style text-richblack-5">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style  bg-richblack-700 text-richblack-200 px-8 py-3 rounded-lg border-b border-b-richblack-200 "
                {...register("gender")}
              >
                <option value="">Select a gender</option>
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style text-richblack-5">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style  bg-richblack-700 text-richblack-200 px-8 py-3 rounded-lg border-b border-b-richblack-200 "
                {...register("contactNumber", {
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style text-richblack-5">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style  bg-richblack-700 text-richblack-200 px-8 py-3 rounded-lg border-b border-b-richblack-200 "
                {...register("about")}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" customClasses="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-40" />
        </div>
      </form>
    </>
  )
}
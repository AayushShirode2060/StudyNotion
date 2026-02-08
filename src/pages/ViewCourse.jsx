import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { HiOutlineMenu, HiX } from "react-icons/hi"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      console.log("Course Data here... ", courseData)
      console.log("Completed Videos: ", courseData.completedVideos)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex h-[calc(100vh-3.5rem)]">
        {/* Desktop sidebar - hidden on small screens */}
        <div className="hidden lg:flex">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Main content area */}
        <div className="flex flex-col w-full">
          {/* Mobile/Tablet header with menu button */}
          <div className="flex items-center justify-between lg:hidden bg-richblack-900 px-3 sm:px-4 py-3 border-b border-richblack-700">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open menu"
              className="text-white hover:opacity-80 transition-opacity"
            >
              <HiOutlineMenu className="text-2xl" />
            </button>
            <div className="text-white font-semibold text-sm sm:text-base">Course Content</div>
            <div className="w-6" />
          </div>

          <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className="mx-3 sm:mx-6">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-richblack-800 shadow-lg overflow-y-auto">
              <div className="flex items-center justify-end p-3 border-b border-richblack-700">
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="text-white hover:opacity-80 transition-opacity"
                >
                  <HiX className="text-2xl" />
                </button>
              </div>
              <VideoDetailsSidebar
                setReviewModal={setReviewModal}
                isMobile={true}
                onClose={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
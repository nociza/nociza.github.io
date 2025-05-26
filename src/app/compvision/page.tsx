import Link from "next/link";

export default function ComputerVisionProjectReports() {
  return (
    <div className="max-w-4xl mx-auto my-12 text-center">
      <h3 className="text-3xl mb-8">
        CS184/284A - Computer Vision: Project Reports
      </h3>
      <ul className="list-none">
        <li className="mb-4">
          <Link
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-acm/"
            className="text-gray-800 no-underline text-xl hover:text-blue-600 transition-colors"
          >
            Project 1: <b>Colorizing the Prokudin-Gorskii photo collection</b>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-acm/"
            className="text-gray-800 no-underline text-xl hover:text-blue-600 transition-colors"
          >
            Project 2: <b>Fun with Filters and Frequencies</b>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj3/cs194-26-acm/"
            className="text-gray-800 no-underline text-xl hover:text-blue-600 transition-colors"
          >
            Project 3: <b>Face Morphing</b>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4A/cs194-26-acm/"
            className="text-gray-800 no-underline text-xl hover:text-blue-600 transition-colors"
          >
            Project 4A: <b>Image Warping and Mosaiacing</b>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-acm/"
            className="text-gray-800 no-underline text-xl hover:text-blue-600 transition-colors"
          >
            Project 4B: <b>Auto-alignment, Image Warping and Mosaiacing</b>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-acm/"
            className="text-gray-800 no-underline text-xl hover:text-blue-600 transition-colors"
          >
            Project 5: <b>Facial Keypoint Detection with Neural Networks</b>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-acm/"
            className="text-gray-800 no-underline text-xl hover:text-blue-600 transition-colors"
          >
            Final Project:{" "}
            <b>Augmented Reality & A Neural Algorithm for Artistic Style</b>
          </Link>
        </li>
      </ul>
    </div>
  );
}

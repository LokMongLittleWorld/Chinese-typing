import {
  faCircleInfo,
  faCodeBranch,
  faEnvelope,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import IconWithText from "../Components/common/IconWithText.jsx";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

export default function Footer() {
  const { isHiddenFooter } = useStateContext();

  return (
    <footer
      className={`fixed bottom-0 w-full flex justify-center ${
        isHiddenFooter ? "hidden" : ""
      }`}
    >
      <div className="w-full py-6 px-12 flex justify-between items-cneter">
        <div className="flex gap-6">
          {leftFooter.map((item, index) => (
            <IconWithText key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
        <div className="flex gap-6">
          {RightFooter.map((item, index) => (
            <IconWithText key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
      </div>
    </footer>
  );
}

const leftFooter = [
  {
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
    text: "About",
  },
  {
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    text: "Contact us",
  },
  {
    icon: <FontAwesomeIcon icon={faGithub} />,
    text: "Source Code",
  },
];

const RightFooter = [
  {
    icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
    text: "Issue Report",
  },
  {
    icon: <FontAwesomeIcon icon={faCodeBranch} />,
    text: "alpha v0.1.0",
  },
];

import {
  faCircleInfo,
  faCodeBranch,
  faEnvelope,
  faLock,
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
      <div className="group w-full py-6 px-12 flex justify-between items-cneter">
        <div className="flex gap-4">
          {leftFooter.map((item, index) => (
            <IconWithText key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
        <div className="flex gap-4">
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
    text: "關於",
  },
  {
    icon: <FontAwesomeIcon icon={faLock} />,
    text: "私隱",
  },
  {
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    text: "聯絡我們",
  },
  {
    icon: <FontAwesomeIcon icon={faGithub} />,
    text: "源代碼",
  },
];

const RightFooter = [
  {
    icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
    text: "問題報告",
  },
  {
    icon: <FontAwesomeIcon icon={faCodeBranch} />,
    text: "alpha版本 v0.1.0",
  },
];

import { IoMailOutline } from "react-icons/io5";
import { IoIosArchive } from "react-icons/io";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const randomArray = [
  {
    id: 1,
    title: "Learn JavaScript Basics",
    description:
      "Start with variables, data types, and basic operations to build a solid foundation.",
  },
  {
    id: 2,
    title: "Explore Frontend Frameworks",
    description:
      "Dive into React, Angular, or Vue to create interactive user interfaces.",
  },
  {
    id: 3,
    title: "Master Backend Development",
    description: "Learn about Node.js, Express, and building RESTful APIs.",
  },
  {
    id: 4,
    title: "Understand Databases",
    description:
      "Explore SQL and NoSQL databases like MySQL and MongoDB for data storage.",
  },
  {
    id: 5,
    title: "Work with Version Control",
    description:
      "Use Git and GitHub for managing your code and collaborating with teams.",
  },
  {
    id: 6,
    title: "Improve Debugging Skills",
    description:
      "Learn to use browser developer tools and debugging techniques effectively.",
  },
  {
    id: 7,
    title: "Learn Responsive Design",
    description:
      "Master CSS and frameworks like Bootstrap to create mobile-friendly websites.",
  },
  {
    id: 8,
    title: "Get Familiar with Testing",
    description:
      "Understand unit testing, integration testing, and tools like Jest or Mocha.",
  },
  {
    id: 9,
    title: "Focus on API Integration",
    description:
      "Learn to consume third-party APIs and integrate them into applications.",
  },
  {
    id: 10,
    title: "Practice Problem Solving",
    description:
      "Enhance coding skills through algorithm challenges and problem-solving platforms.",
  },
  {
    id: 11,
    title: "Build Personal Projects",
    description:
      "Apply your skills by building portfolio-worthy projects to showcase your abilities.",
  },
  {
    id: 12,
    title: "Learn About Security",
    description:
      "Understand basics of web security, including XSS, CSRF, and HTTPS.",
  },
  {
    id: 13,
    title: "Dive into DevOps",
    description:
      "Get familiar with CI/CD pipelines, Docker, and deployment strategies.",
  },
  {
    id: 14,
    title: "Understand Cloud Computing",
    description:
      "Learn about AWS, Azure, or Google Cloud for scalable application hosting.",
  },
  {
    id: 15,
    title: "Explore Advanced JavaScript",
    description:
      "Deepen knowledge in ES6+ features, async/await, and advanced concepts.",
  },
];

function App() {
  const [messages, setMessages] = useState<
    Array<{ title: string; description: string; id: number }>
  >([]);

  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  const addMessage = () => {
    setMessages((prev) => [
      {
        ...randomArray[Math.floor(Math.random() * randomArray.length)],
        id: Math.random(),
      },
      ...prev,
    ]);
  };

  const onDelete = (id: number) => {
    /*   setMessages((prev) => prev.filter((m) => m.id !== id)); */
    if (selectedMessages.includes(id)) {
      setSelectedMessages((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedMessages((prev) => [...prev, id]);
    }
  };

  const deleteSelectedMessages = () => {
    setMessages((prev) => prev.filter((m) => !selectedMessages.includes(m.id)));
    setSelectedMessages([]);
  };
  return (
    <div className="w-screen h-screen bg-neutral-900 flex items-center justify-center">
      <div className="bg-neutral-100 w-[800px] rounded-lg h-[700px] flex">
        <div className="border-r-[1px] border-r-neutral-300 h-full flex flex-col  w-[250px]">
          <div className="flex items-center justify-between border-b-[1px] border-b-neutral-300 p-4">
            <button onClick={() => addMessage()}>
              <IoMailOutline className="text-neutral-600 w-6 h-6" />
            </button>
            <button onClick={() => deleteSelectedMessages()}>
              <IoIosArchive className="text-neutral-600 w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col overflow-y-auto flex-1 gap-1 p-2">
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                return (
                  <Message
                    onDelete={onDelete}
                    key={message.id.toString()}
                    isSelected={selectedMessages.includes(message.id)}
                    {...message}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

function Message({
  title,
  description,
  onDelete,
  id,
  isSelected,
}: {
  title: string;
  description: string;
  id: number;
  isSelected: boolean;
  onDelete: (id: number) => void;
}) {
  return (
    <motion.div
      className={`px-4 hover:bg-neutral-200 rounded-md cursor-pointer w-full ${
        isSelected && "bg-blue-400 hover:bg-blue-400 text-white"
      }`}
      onClick={() => onDelete(id)}
      variants={{
        initial: {
          opacity: 0,
          height: 0,
        },
        animate: {
          opacity: 1,
          height: "auto",
        },
      }}
      transition={{ type: "spring", bounce: 0.2 }}
      initial="initial"
      animate="animate"
      exit={{
        opacity: 0,
        height: 0,
        transition: { duration: 0.1 },
      }}
    >
      <h3
        className={`text-lg text-neutral-900 w-full overflow-hidden text-ellipsis whitespace-nowrap pt-2 ${
          isSelected && "text-white"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-neutral-600 text-sm w-full overflow-hidden text-ellipsis whitespace-nowrap pb-2 ${
          isSelected && "text-neutral-100"
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}
export default App;

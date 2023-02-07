import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/outline";

const ThemeSwitch = () => {

  const { theme, setTheme } = useTheme();


  return (
    <>
      <style jsx global>
        {`
        .switch {
          font-size: 17px;
          position: relative;
          display: inline-block;
          width: 3.5em;
          height: 2em;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          --background: #28096b;
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--background);
          -webkit-transition: .5s;
          transition: .5s;
          border-radius: 30px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 1.4em;
          width: 1.4em;
          border-radius: 50%;
          left: 10%;
          bottom: 15%;
          -webkit-box-shadow: inset 8px -4px 0px 0px #fff000;
                  box-shadow: inset 8px -4px 0px 0px #fff000;
          background: var(--background);
          -webkit-transition: .5s;
          transition: .5s;
        }
        
        input:checked + .slider {
          background-color: #522ba7;
        }
        
        input:checked + .slider:before {
          -webkit-transform: translateX(100%);
              -ms-transform: translateX(100%);
                  transform: translateX(100%);
          -webkit-box-shadow: inset 15px -4px 0px 15px #fff000;
                  box-shadow: inset 15px -4px 0px 15px #fff000;
        }
        `}
      </style>
    <div className="md:inline-flex hidden items-center">
      <SunIcon className="w-4 h-4 mr-2" />
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
    </>
  );
};

export default ThemeSwitch;

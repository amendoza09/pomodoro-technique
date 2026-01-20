import Footer from './Footer'

const HowTo = () => {
    return (
        <div className="lg:h-screen bg-white p-10 flex flex-col font-semibold">
            <div className="flex flex-col lg:flex-row h-full">
                <div className="md:w-1/3 px-2 md:px-5">
                    <h1 className="underline text-2xl">What is The Pomodoro Technique?</h1>
                    <p className="py-5 text-lg">
                        The Pomodoro Technique is a time management method built around short, focused work sessions 
                        (typically 25 minutes) followed by brief, restorative breaks.
                        <br />
                        <br />
                        Each 25-minute interval is called a pomodoro.
                        But the classic 25/5 pattern isn’t a rule — it’s a framework. Short focus sessions are powerful for getting
                        started on complex tasks, overcoming procrastination, and heightening focus through urgency. 
                        <br />
                        <br />
                        Although, many people achieve their best flow in longer deep work blocks, where interruptions are minimized 
                        and concentration compounds over time. Here are popular Pomodoro Timer intervals to explore:
                    </p>
                    <ul className="text-lg list-disc pl-5">
                        <li>25-minute task session, 5-minute break</li>
                        <li>30-minute task session, 6-minute break</li>
                        <li>50-minute task session, 10-minute break</li>
                        <li>1.5-hour task session, 15-minute break</li>
                        <li>2-hour task session, 20-minute break</li>
                    </ul>
                </div>
                <div className="md:w-1/3 md:px-5">
                    <h1 className="underline text-2xl">How to use the timer</h1>
                    <ol className="text-lg list-decimal pl-5 pt-5">
                        <li>Type in your intention for todays session</li>
                        <li>Add tasks to work on</li>
                        <li>Start timer and focus on the task for 25 minutes</li>
                        <li>Take a break for 5 minutes when the alarm rings</li>
                        <li>Repeat steps 3 & 4 until finish your session</li>
                        <li>After 4 pomodoros, take a 15 minute break</li>
                    </ol>
                </div>
                <div className="md:w-1/3">
                    <h1 className="underline text-2xl">Current features</h1>
                    <ul className="text-lg list-disc pl-5">
                        <li>Personalize your focus/break time</li>
                        <li>Add tasks to a to do list, and mark them off</li>
                        <li>Supports mobile and desktop devices</li>
                        <li>Disable and enable alarm</li>
                        <li>Fullscreen mode to help you focus</li>
                    </ul>
                </div>
            </div>
            <div className="bottom-0 h-5">
                <Footer />
            </div>
        </div>
    )
}

export default HowTo;
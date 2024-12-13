import {useCuties} from "./service/queries.ts";
import {CreateCutie} from "./components/CreateCutie.tsx";
import {Tooltip} from "react-tippy";
import {format} from "date-fns";
import {getEmoji} from "./util";
import {motion} from "framer-motion";
import 'react-tippy/dist/tippy.css'


export default function App() {
    const {data} = useCuties()
    return (
        <div className="min-h-screen flex justify-center flex-col items-center bg-neutral-900 text-sky-50 gap-5">
            <h1 className="text-3xl text-sky-200">All Cuties</h1>
            <div className="flex justify-center items-center gap-2.5 flex-wrap
            ">
                {data?.map((cutie) => {
                        return (
                            // eslint-disable-next-line
                            // @ts-expect-error
                            <Tooltip key={cutie._id}
                                      followCursor
                                     html={<>Cutie since <span className="font-bold">{format(cutie.createdAt!, "do MMM Y")}</span> {getEmoji()}</>}
                                     // title={`Cutie since ${format(cutie.createdAt!, "do MMM Y")} ${getEmoji()}`}
                                     arrow>
                                <motion.h1
                                    className="text-xl cursor-pointer"
                                    initial={{opacity: 0, y: 40, filter: "blur(4px)"}}
                                    animate={{opacity: 1, y: 0, filter: "blur(0px)",}}
                                    transition={{
                                        duration: 1,
                                        type: "spring",
                                        bounce: 0.3,
                                        // delay: 0.1 * i,
                                    }}
                                >
                                    {cutie.name}
                                </motion.h1>

                            </Tooltip>)
                    }
                )}
            </div>
            <div className="mt-20"><CreateCutie/></div>
        </div>
    )
        ;
}

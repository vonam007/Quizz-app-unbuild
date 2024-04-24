import './DashBoard.scss';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { getOverview } from '../../../../services/apiService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const DashBoard = (props) => {


    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchOverviewData()
    }, [])

    const fetchOverviewData = async () => {
        const response = await getOverview();
        console.log(response);
        if (response && response.EC === 0) {
            setDataOverview(response.DT)
            setDataChart([
                {
                    "name": "Users",
                    "users": response.DT.users.total
                },
                {
                    "name": "Quizzes",
                    "quizz": response.DT.others.countQuiz
                },
                {
                    "name": "Question",
                    "ques": response.DT.others.countQuestions
                },
                {
                    "name": "Answers",
                    "ans": response.DT.others.countAnswers
                }
            ])
        }
        else if (response && response.EC !== 0) {
            toast.error(response.EM)
        }
    }

    return (
        <div className='dashBoard-container'>
            <h1>Analytics Dashboard</h1>

            <div className='dashBoard-content'>
                <div className='left-content'>
                    <div className='child-chart'>
                        <span>Total Users</span>
                        <span className='numbers'>
                            {
                                dataOverview && dataOverview.users &&
                                    dataOverview.users.total
                                    ? <>{dataOverview.users.total}</>
                                    : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child-chart'>
                        <span>Total Quizzes</span>
                        <span className='numbers'>
                            {
                                dataOverview && dataOverview.others &&
                                    dataOverview.others.countQuiz
                                    ? <>{dataOverview.others.countQuiz}</>
                                    : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child-chart'>
                        <span>Total Questions</span>
                        <span className='numbers'>
                            {
                                dataOverview && dataOverview.others &&
                                    dataOverview.others.countQuestions
                                    ? <>{dataOverview.others.countQuestions}</>
                                    : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child-chart'>
                        <span>Total Answers</span>
                        <span className='numbers'>
                            {
                                dataOverview && dataOverview.others &&
                                    dataOverview.others.countAnswers
                                    ? <>{dataOverview.others.countAnswers}</>
                                    : <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='right-content'>
                    <ResponsiveContainer width={'95%'} height={"70%"}>
                        <BarChart data={dataChart} >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            users quizz ques ans
                            <Bar dataKey="users" fill="#1D2B53" />
                            <Bar dataKey="quizz" fill="#7E2553" />
                            <Bar dataKey="ques" fill="#FF004D" />
                            <Bar dataKey="ans" fill="#ED9455" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;
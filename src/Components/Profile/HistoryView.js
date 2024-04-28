import { useState, useEffect } from 'react';
import { getHistory } from '../../services/apiService';
const HistoryView = (props) => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const formatDateTime = (date) => {

        let dateObject = new Date(date);
        let formatter = new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        });

        return formatter.format(dateObject);
    }
    const fetchHistory = async () => {
        const res = await getHistory();
        if (res && res.EC === 0) {
            let data = res.DT.data.map((item) => {
                return {
                    id: item.id,
                    name: item.quizHistory.name,
                    total_questions: item.total_questions,
                    total_correct: item.total_correct,
                    date: formatDateTime(item.createdAt)
                }
            });
            setHistory(data);
        }
    }

    return (
        <div className="history-view">
            <button className="back-to-profile-btn" onClick={() => props.setIsViewHistory(false)}>Back to Profile</button>
            <table className="table table-history ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quizz Name</th>
                        <th>Total Questions</th>
                        <th>Total Correct</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {history && history.length > 0 &&
                        history.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
export default HistoryView;
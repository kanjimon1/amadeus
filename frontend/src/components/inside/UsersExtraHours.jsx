import React, { useState, useEffect, useContext } from 'react';
import UserService from '../service/UserService';
import background from '../../assets/images/mainBackground.png';
import { AuthContext } from '../context/AuthContext';
import { Outlet, Link, useNavigate, Form } from 'react-router-dom';
import CreateModal from './CreateExtraHourModal';
import UpdateModal from './UpdateExtraHoursModal';
import DeleteModal from './DeleteExtraHoursModal';

const UsersExtraHours = () => {

    const [extraHours, setExtraHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    //const [selectedHour, setSelectedHour] = useState(null);
    const [selectedHour, setSelectedHour] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {

        //const FetchExtraHoursUsersByUser = async (email) => {
        const fetchExtraHoursUsersByUser = async () => {
            try {
                const data = await UserService.getAllExtraHoursUsersByUser(auth.token, auth.email);
                console.log("RESPUESTA DESDE EL SERVER: ", data);
                // Map the response to the structure expected by extraHours
                const formattedData = data.map(hour => ({
                    id: hour.employeeId,
                    employee: {
                        employeeId: hour.employeeId,
                        employeeName: hour.employeeName,
                        salary: hour.salary,
                        area: { areaName: hour.areaName },
                        job: { jobName: hour.jobName }
                    },
                    amountExtraHours: hour.amountExtraHours,
                    startDatetime: hour.startDatetime,
                    endDatetime: hour.endDatetime,
                    totalExtraHour: hour.totalExtraHour,
                    totalPayment: hour.totalPayment,
                    extraHourType: {
                        description: hour.extraHourTypeDescription
                    }
                }));
                setExtraHours(formattedData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user extra hours:', err);
                setError('Error loading user extra hours data');
                setLoading(false);
            }
        };

        if (isAuthenticated && auth.role === 'USER' && auth.email) {
            console.log("Auth state:", { isAuthenticated, role: auth.role, email: auth.email });
            fetchExtraHoursUsersByUser();
        }

    }, [isAuthenticated, auth]);


    useEffect(() => {

        console.log("ENTRA AL USE EFFECT");
        const fetchExtraHoursUsers = async () => {
            console.log("ENTRA AL USE EFFECT FECTH ADMIN");
            try {
                const data = await UserService.getAllExtraHoursUsers(auth.token);
                setExtraHours(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching extra hours:', err);
                setError('Error loading extra hours data');
                setLoading(false);
            }
        };

        if (isAuthenticated && auth.role === 'ADMIN') {
            console.log("Auth state:", { isAuthenticated, role: auth.role, email: auth.email });
            fetchExtraHoursUsers();
        }

    }, [isAuthenticated, auth]);

    const handleCreate = async (newData) => {
        try {
            const newHour = await UserService.createExtraHour(auth.token, newData);
            setExtraHours([...extraHours, newHour]);
            setCreateModalOpen(false);
        } catch (err) {
            console.error('Error creating extra hour:', err);
            setError('Error creating extra hour');
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            await UserService.updateExtraHour(auth.token, id, updatedData);
            setExtraHours(
                extraHours.map((hour) =>
                    hour.id === id ? { ...hour, ...updatedData } : hour
                )
            );
            setUpdateModalOpen(false);
        } catch (err) {
            console.error('Error updating extra hour:', err);
            setError('Error updating extra hour');
        }
    };

    const handleDelete = async (id) => {
        try {
            await UserService.deleteExtraHour(auth.token, id);
            setExtraHours(extraHours.filter((hour) => hour.id !== id));
            setDeleteModalOpen(false);
        } catch (err) {
            console.error('Error deleting extra hour:', err);
            setError('Error deleting extra hour');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="table-container">
            <button
                className="create-button"
                onClick={() => setCreateModalOpen(true)}
            >
                Crear nuevo registro
            </button>
            <h2>Horas Extra Amadeus</h2>

            {extraHours.length > 0 ? (
                <div className="overflow-x-auto">
                    <center>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Id empleado</th>
                                    <th>Nombre Empleado</th>
                                    <th>Cargo</th>
                                    <th>Salario</th>
                                    <th>Area</th>
                                    <th>% H/Extra</th>
                                    <th>Desc H/Extra</th>
                                    <th>startDatetime</th>
                                    <th>endDatetime</th>
                                    <th>hourPrice</th>
                                    <th>amountExtraHours</th>
                                    <th>comments</th>
                                    <th>totalExtraHour</th>
                                    <th>totalPayment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extraHours.map((hour) => (
                                    <tr key={hour.id} className="hover:bg-gray-50">
                                        <td>{hour.id}</td>
                                        <td>{hour.employee.employeeId}</td>
                                        <td >{hour.employee.employeeName}</td>
                                        <td>{hour.employee.job.jobName}</td>
                                        <td>{hour.employee.salary}</td>
                                        <td>{hour.employee.area.areaName}</td>
                                        <td>{hour.extraHourType.percentage}</td>
                                        <td>{hour.extraHourType.percentage}</td>
                                        <td>{hour.startDatetime}</td>
                                        <td>{hour.endDatetime}</td>
                                        <td>{hour.hourPrice}</td>
                                        <td>{hour.amountExtraHours}</td>
                                        <td>{hour.comments}</td>
                                        <td>{hour.totalExtraHour}</td>
                                        <td>{hour.totalPayment}</td>
                                        <td>
                                            <button className="delete-button">Delete</button>
                                            <button className="update-button">
                                                {/*<Link to={`/update-user/${hour.id}`}>
                                                    Update
                                                </Link>*/}
                                                <button
                                                    className="update-button"
                                                    onClick={() => {
                                                        setSelectedHour(hour);
                                                        setUpdateModalOpen(true);
                                                    }}
                                                >
                                                    Update
                                                </button>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </center>
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">
                    No se encontraron registros de horas extra
                </div>
            )}

            <CreateModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={handleCreate}
            />
            <UpdateModal
                isOpen={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                onUpdate={handleUpdate}
                hour={selectedHour}
            />
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleDelete}
                id={selectedHour?.id}
            />


        </div>
    );
};

export default UsersExtraHours;
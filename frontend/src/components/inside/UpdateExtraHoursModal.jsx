import React, { useState, useEffect } from 'react';
//import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Input, Select } from '@/components/ui/dialog';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const UpdateExtraHoursModal = ({ isOpen, onClose, onUpdate, hour }) => {
    //if (!hour) return null; // Exit early if `hour` is null

    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        jobName: '',
        salary: '',
        areaName: '',
        percentage: '',
        description: '',
        startDatetime: '',
        endDatetime: '',
        hourPrice: '',
        amountExtraHours: '',
        comments: '',
        totalExtraHour: '',
        totalPayment: '',
    });

    //const [formData, setFormData] = useState({
    // Set `formData` values conditionally after hooks are declared
    useEffect(() => {
        if (hour) {
            setFormData({
                employeeId: hour.employee?.employeeId || '',
                employeeName: hour.employee?.employeeName || '',
                jobName: hour.employee?.job?.jobName || '',
                salary: hour.employee?.salary || '',
                areaName: hour.employee?.area?.areaName || '',
                percentage: hour.extraHourType?.percentage || '',
                description: hour.extraHourType?.description || '',
                startDatetime: hour.startDatetime || '',
                endDatetime: hour.endDatetime || '',
                hourPrice: hour.hourPrice || '',
                amountExtraHours: hour.amountExtraHours || '',
                comments: hour.comments || '',
                totalExtraHour: hour.totalExtraHour || '',
                totalPayment: hour.totalPayment || '',
            });
        }
    }, [hour]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onUpdate(hour.id, formData);
        onClose();
    };

    {/*const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(formData);
    };*/}

    if (!isOpen || !hour) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} classes={{ paper: 'customDialog' }} // Customize width and height here
        >
            <DialogTitle>Actualizar registro {hour.employee?.employeeName}</DialogTitle>
            <DialogContent>
                <div className="grid grid-cols-2 gap-4">
                    <Input name="employeeId" label="ID empleado" value={formData.employeeId} onChange={handleInputChange} />
                    <Input name="employeeName" label="Nombre empleado" value={formData.employeeName} onChange={handleInputChange} />
                    <Input name="jobName" label="Cargo" value={formData.jobName} onChange={handleInputChange} />
                    <Input name="salary" label="Salario" value={formData.salary} onChange={handleInputChange} />
                    <Input name="areaName" label="Area" value={formData.areaName} onChange={handleInputChange} />
                    <Input name="percentage" label="% H/Extra" value={formData.percentage} onChange={handleInputChange} />
                    <Input name="description" label="Desc H/Extra" value={formData.description} onChange={handleInputChange} />
                    <Input name="startDatetime" label="startDatetime" value={formData.startDatetime} onChange={handleInputChange} />
                    <Input name="endDatetime" label="endDatetime" value={formData.endDatetime} onChange={handleInputChange} />
                    <Input name="hourPrice" label="hourPrice" value={formData.hourPrice} onChange={handleInputChange} />
                    <Input name="amountExtraHours" label="amountExtraHours" value={formData.amountExtraHours} onChange={handleInputChange} />
                    <Input name="comments" label="comments" value={formData.comments} onChange={handleInputChange} />
                    <Input name="totalExtraHour" label="totalExtraHour" value={formData.totalExtraHour} onChange={handleInputChange} />
                    <Input name="totalPayment" label="totalPayment" value={formData.totalPayment} onChange={handleInputChange} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Actualizar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateExtraHoursModal;
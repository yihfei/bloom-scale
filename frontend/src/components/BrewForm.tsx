import React, { useState } from 'react';
import type { BrewData } from '../types/brew';


export const BrewForm = ({ onSubmit }: { onSubmit: (data: BrewData) => void }) => {
  const [formData, setFormData] = useState({
    coffee: '', roaster: '', grindSize: '', 
    temp: '', dose: '', water: '', 
    minutes: '', seconds: '', notes: ''
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.coffee || !formData.roaster || !formData.dose || !formData.water) return;

    onSubmit({
      ...formData,
      temp: formData.temp ? Number(formData.temp) : undefined,
      dose: Number(formData.dose),
      water: Number(formData.water),
      minutes: formData.minutes ? Number(formData.minutes) : undefined,
      seconds: formData.seconds ? Number(formData.seconds) : undefined,
    } as BrewData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label>Coffee: <input required value={formData.coffee} onChange={e => setFormData({...formData, coffee: e.target.value})} /></label>
      <label>Roaster: <input required value={formData.roaster} onChange={e => setFormData({...formData, roaster: e.target.value})} /></label>
      <label>Grind Size: <input required value={formData.grindSize} onChange={e => setFormData({...formData, grindSize: e.target.value})} /></label>
      <label>Temp (°C): <input type="number" value={formData.temp} onChange={e => setFormData({...formData, temp: e.target.value})} /></label>
      <label>Dose (g): <input required type="number" value={formData.dose} onChange={e => setFormData({...formData, dose: e.target.value})} /></label>
      <label>Water (g): <input required type="number" value={formData.water} onChange={e => setFormData({...formData, water: e.target.value})} /></label>
      <div>
        <span>Time: </span>
        <input type="number" placeholder="Min" value={formData.minutes} onChange={e => setFormData({...formData, minutes: e.target.value})} />
        <input type="number" placeholder="Sec" value={formData.seconds} onChange={e => setFormData({...formData, seconds: e.target.value})} />
      </div>
      <label>Notes: <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} /></label>
      <button type="submit">Save Brew</button>
    </form>
  );
};
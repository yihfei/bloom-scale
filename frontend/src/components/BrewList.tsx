import type { SavedBrew } from "../types/brew";

interface BrewListProps {
    brews: SavedBrew[];
}

export const BrewList = ({ brews }: BrewListProps) => {
    return (
        <div className="flex flex-col gap-4">
            {brews.length === 0 && <p>No brews recorded yet</p>}
            {brews.map(brew => (
                <div key={brew.id} className="border p-4 rounded">
                    <h3 className="text-lg font-bold">{brew.coffee} by {brew.roaster}</h3>
                    <p>Grind Size: {brew.grindSize}</p>
                    <p>Dose: {brew.dose}g, Water: {brew.water}g</p>
                    {brew.temp && <p>Temp: {brew.temp}°C</p>}
                    {(brew.minutes || brew.seconds) && (
                        <p>Time: {brew.minutes ? `${brew.minutes}m ` : ''}{brew.seconds ? `${brew.seconds}s` : ''}</p>
                    )}
                    {brew.notes && <p>Notes: {brew.notes}</p>}
                </div>
            ))}
        </div>
    );
}    

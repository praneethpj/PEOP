




export default function BasicDetailsForm(professionName,setProfessionName) {
    return <div>
        <div className="form-group">
            <label>What is your Profession</label>
            <input className="form-control" type="text" placeholder="professionName"
                value={
                    professionName
                }
                setProfessionName={e => (e.target.value )}

            />
        </div>
    </div>
}
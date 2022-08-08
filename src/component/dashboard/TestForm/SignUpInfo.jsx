import React from "react";

function SignUpInfo({ formData, setFormData }) {
    return (
        <div className="sign-up-container">
            <div className="form-group">

                <label>What is your Profession</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="professionName"
                    value={formData.professionName}
                    onChange={(event) =>
                        setFormData({ ...formData, professionName: event.target.value })
                    }
                />
            </div>
            <div className="form-group">
                <label>Briefly Describe about it</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={formData.description}
                    onChange={(event) =>
                        setFormData({ ...formData, description: event.target.value })
                    }
                />
            </div>
            <div className="form-group">
                <label>How much charge you per hour</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="chargesperHour"
                    value={formData.chargesperHour}
                    onChange={(event) =>
                        setFormData({ ...formData, chargesperHour: event.target.value })
                    }
                />
            </div>
        </div>
    );
}

export default SignUpInfo;
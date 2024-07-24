import React, { useState } from "react"

const ContactUs: React.FunctionComponent = () => {
    const [formError, setFormError] = useState({
        name: "",
        email: "",
        comment: "",
    });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: "",
    });

    //email validation
    const validateEmail = (email: string) => {
        // Regex for validating email format
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    //handle email input
    const handleEmailChange = (e: any) => {
        const email = e.target.value;
        setFormData({ ...formData, email: email })

        if (!validateEmail(email)) {
            setFormError({ ...formError, email: 'Invalid email format' });
        } else {
            setFormError({ ...formError, email: '' });
        }
    };

    //handle comment
    const handleCommentChange = (e: any) => {
        const comment = e.target.value;
        setFormData({ ...formData, comment: e.target.value })

        if (comment.length < 50) {
            setFormError({ ...formError, comment: 'Comment should have minimum 50 characters' });
        } else {
            setFormError({ ...formError, comment: '' });
        }
    };

    return (
        <>
            <div style={{ background: "#fef3f2", height: 'calc(100vh - 90px)' }}>
                <h1 style={{ margin: '0 0 20px 0', color: '#000', fontWeight: "600", padding: '20px' }}>Comments</h1>

                {/* form of contact us */}
                <div style={{ width: "100%", display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: "center" }}>
                    <div style={{ marginTop: '10px', width: "60%", display: 'flex', flexDirection: 'column', gap: '10px', padding: "40px 20px", borderRadius: "10px" }}>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                            <div style={{ fontSize: "18px", color: '#000', marginBottom: "15px" }}>Name</div>
                            <div style={{ width: '83%', textAlign: 'left' }}>
                                <input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    type="text" placeholder="Name"
                                    style={{ width: "100%", padding: '7px 10px', borderRadius: "5px", fontSize: "14px" }}
                                />
                                <div className="error d-flex text-danger"
                                    style={{ fontSize: "10px", marginTop: "5px", minHeight: '15px', fontWeight: '500', color: "red" }}>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                            <div style={{ fontSize: "18px", color: '#000', marginBottom: "15px" }}>Email</div>
                            <div style={{ width: '83%', textAlign: 'left' }}>
                                <input value={formData.email} onChange={(e) => handleEmailChange(e)}
                                    type="text" placeholder="Email" style={{ width: "100%", padding: '7px 10px', borderRadius: "5px", fontSize: "14px" }} />

                                <div className="error d-flex text-danger"
                                    style={{ fontSize: "10px", marginTop: "5px", minHeight: '15px', fontWeight: '500', color: "red" }}>
                                    {formError?.email}
                                </div>
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <div style={{ fontSize: "18px", color: '#000' }}>Comment</div>
                            <div style={{ width: '83%', textAlign: 'left' }}>
                                <textarea value={formData.comment} onChange={(e) => handleCommentChange(e)} placeholder="comment" style={{ width: "100%", padding: '7px 10px', borderRadius: "5px", fontSize: "14px", minHeight: "50px" }}></textarea>
                                <div className="error d-flex text-danger"
                                    style={{ fontSize: "10px", marginTop: "5px", minHeight: '15px', fontWeight: '500', color: "red" }}>
                                    {formError?.comment}
                                </div>
                            </div>
                        </div>
                        <div>

                            <button disabled={!formError?.email && !formError?.comment && formData.email && formData.name && formData.comment ? false : true}
                                style={{
                                    background: "#f26541",
                                    opacity: `${!formError?.email && !formError?.comment && formData.email && formData.name && formData.comment ? "1" : "0.4"}`,
                                    color: '#fff', fontWeight: "500", padding: "5px 15px",
                                    fontSize: "18px", borderRadius: "5px", border: "none"
                                }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs
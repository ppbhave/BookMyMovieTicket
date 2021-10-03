import { useRef, useState } from "react";

function WriteReviewModal({ film, user }) {
    const newReview = useRef({
        jRating: 0, movie: film, user: user, sReview: "", sReviewSummery: ""
    });
    const starRating = [1, 2, 3, 4, 5];
    const [rating, setRating] = useState(0);
    // const [starhover,setstarhover] =useState(0);
    const ratingstarstyle = (index) => {
        return index <= rating ? { color: "rgb(245, 197, 24)" } : {}
    }
    const updateRatingStar = (index) => {
        newReview.current.jRating = index;
        setRating(index);
    }
    // const ratingstarhover=(index)=>{
    //     setRating(index);  
    // }
    // const ratingstarout=()=>{
    //     setRating(newReview.current.jRating); 
    // }
    const writeReview = () => {
        if (newReview.current.user > 0 || newReview.current.movie > 0) {
            if (newReview.current.sReviewSummery === "" || newReview.current.sReview === "" || newReview.current.jRating === 0) {
                alert("Mandatory fields missing")
            } else {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newReview.current)
                };
                fetch('http://localhost:8080/session/newReview', requestOptions)
                    .then(resp => resp.json())
                    .then((statuscode) => statuscode === "OK" ? alert("successful") : alert("Something went wrong"))
            }
        }
        else alert("login needed")
    }
return (
    <div className="modal fade" id="writeReview" tabindex="-1" role="dialog" aria-labelledby="writeReviewLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Write Review</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label className="col-form-label">Summery:</label>
                            <input type="text" className="form-control" onChange={e => { newReview.current.sReviewSummery = e.target.value }} />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Write Review:</label>
                            <textarea className="form-control" onChange={e => { newReview.current.sReview = e.target.value }}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label">Rate Movie:</label>
                            <div>
                                {
                                    starRating.map(star => {
                                        const index = star;
                                        return <label key={index}><input type="radio" className="ratingRadio" value={index} onClick={e => { updateRatingStar(e.target.value) }} /><i className="bx bxs-star ratingstar" style={ratingstarstyle(star)} ></i></label>  //onMouseOver={e=>{ratingstarhover(index)}} onmouseout={ratingstarout()}
                                    })
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={e => { e.preventDefault(); writeReview() }}>Submit</button>
                </div>
            </div>
        </div>
    </div>
)
}

export default WriteReviewModal;
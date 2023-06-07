
const ClassesCard = ({ item }) => {
    const { className, image, instructor, seats, price } = item;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{className}</h2>
                    <div>
                        <div>Instructor: {instructor}</div>
                        <div>Availabe seats: {seats}</div>
                        <div>Price: ${price}</div>
                    </div>
                    <div className="card-actions">
                        <button className="btn btn-primary">Enroll now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;
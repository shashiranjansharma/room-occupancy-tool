import InfoSvg from '../assets/info-circle.svg';


export default function RoomType({ availableRooms, setAvailableRooms, roomType, result }: { availableRooms: string; setAvailableRooms: Function; roomType: string; result: Record<string, number>; }) {
    return (
        <div className={`w-50 card ${roomType}-used`}>
            <label className="label" htmlFor={`free-${roomType}-rooms`}>
                Available {roomType} rooms
                <span className="required cursor-help" title="This field is required and must be a positive number">
                    <img src={InfoSvg} width={15} alt="info" />
                </span>
            </label>
            <div className="input">
                <input
                    id={`free-${roomType}-rooms`}
                    data-testid={`free-${roomType}-rooms`}
                    required
                    aria-required="true"
                    value={availableRooms}
                    onChange={e => setAvailableRooms(e.target.value)}
                />
                {(isNaN(Number(availableRooms)) || Number(availableRooms) < 0) && (
                    <span className="error-message">This field must be a positive number</span>
                )}
            </div>
            <p>
                Rooms Used: {result[`${roomType}RoomsUsed`]} — &nbsp;
                <span
                    data-testid={`${roomType}-rooms-total-revenue`}
                    data-value={result[`${roomType}Revenue`]}
                >
                    €{result[`${roomType}Revenue`]}
                </span>
            </p>
        </div>
    );
}
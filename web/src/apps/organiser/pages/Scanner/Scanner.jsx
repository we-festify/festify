import { useEffect, useRef, useState } from "react";
import styles from "./Scanner.module.css";
import QRScanner from "qr-scanner";
import {
  useCheckInEntryPassMutation,
  useGetEntryPassByIdQuery,
} from "../../../../state/redux/entryPass/entryPassApi";
import { getEntryPassFromQRData } from "../../../../utils/qr-code";
import { formatDateTime } from "../../../../utils/time";
import { toast } from "../../components/Toast";

const Scanner = () => {
  const videoRef = useRef(null);
  const [result, setResult] = useState(null);
  const [qrScanner, setQrScanner] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState(null);
  const {
    data: { entryPass } = {},
    isLoading,
    error: entryPassError,
  } = useGetEntryPassByIdQuery(result?._id);
  const [checkInEntryPass, { isLoading: checkInLoading, error: checkInError }] =
    useCheckInEntryPassMutation();

  useEffect(() => {
    QRScanner?.listCameras()?.then((cameras) => {
      setCameras(cameras);
    });

    const qrs = new QRScanner(
      videoRef.current,
      (output) => {
        setResult(getEntryPassFromQRData(output?.data));
        qrs.stop();
      },
      {
        maxScansPerSecond: 2,
      }
    );
    setQrScanner(qrs);

    return () => {
      qrs.stop();
      qrs.destroy();
    };
  }, []);

  const setCamera = (camera) => {
    qrScanner?.setCamera(camera.id);
  };

  const start = () => {
    setResult(null);
    setError(null);
    qrScanner?.start();
  };

  const stop = () => {
    qrScanner?.stop();
  };

  const handleCheckInEntryPass = async () => {
    try {
      await checkInEntryPass(entryPass?._id).unwrap();
      toast.success("Checked In Successfully");
      setResult(null);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
      setError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scanner}>
        <video className={styles.video} ref={videoRef}></video>
        <div className={styles.overlay}>
          {!result && <div className={styles.corners}></div>}
        </div>
        {result && (
          <div className={styles.result}>
            {entryPassError && (
              <div className={styles.error}>
                {entryPassError?.data?.message}
              </div>
            )}
            {error && <div className={styles.error}>{error}</div>}
            {isLoading && <div className={styles.loading}>Loading...</div>}
            {!isLoading && (
              <>
                <div className={styles.details}>
                  {entryPass?.isUsed && (
                    <div className={styles.used}>Already Used</div>
                  )}
                  <div className={styles.item}>
                    <p className={styles.key}>Entry Id</p>
                    <p className={styles.value}>{entryPass?._id}</p>
                  </div>
                  <div className={styles.item}>
                    <p className={styles.key}>Booked By</p>
                    <p className={styles.value}>{entryPass?.user?.name}</p>
                  </div>
                  <div className={styles.item}>
                    <p className={styles.key}>Contact Email</p>
                    <p className={styles.value}>{entryPass?.user?.email}</p>
                  </div>
                  <div className={styles.item}>
                    <p className={styles.key}>Event Name</p>
                    <p className={styles.value}>{entryPass?.event?.name}</p>
                  </div>
                  <div className={styles.item}>
                    <p className={styles.key}>Used At</p>
                    <p className={styles.value}>
                      {formatDateTime(entryPass?.usedAt)}
                    </p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    disabled={entryPass?.isUsed}
                    onClick={handleCheckInEntryPass}
                  >
                    {checkInLoading || isLoading
                      ? "Loading..."
                      : entryPass?.isUsed
                      ? "Already Used"
                      : "Check In"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
      </div>
      <select
        className={styles.cameras}
        onChange={(e) => {
          const camera = cameras.find(
            (camera) => camera.label === e.target.value
          );
          setCamera(camera);
        }}
        defaultValue={qrScanner?.camera?.label}
      >
        {cameras.map((camera) => (
          <option key={camera.id} className={styles.camera}>
            {camera.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Scanner;

import styles from "../../styles/Chat.module.scss";
import { BiSearchAlt2, BiSend } from "react-icons/bi";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { TiAttachment } from "react-icons/ti";

const Chat = (props: any) => {
  return (
    <div className={props.style}>
      <div className={styles.message}>
        <div className={styles.messageHeader}>
          <h1 className="text-start">Messages</h1>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search here..." />
            <span>
              <BiSearchAlt2 size={"1.6rem"} />
            </span>
          </div>
        </div>
        <div className={styles.chatGroup}>
          <h1>Chats</h1>
          <div className={styles.chatList}>
            <div className={styles.chatMain}>
              <span className={styles.chatUser}>
                <div className="bg-blue-500"></div>
                <div>
                  <h1 className={styles.chatGroupName}>Class History</h1>
                  <p className={styles.chatMsg}>Lorem ipsum dolor...</p>
                </div>
              </span>
              <span className={styles.chatTime}>
                <h2>12:45AM</h2>
                <div>
                  <h3>122</h3>
                </div>
              </span>
            </div>

            <div className={styles.chatMain}>
              <span className={styles.chatUser}>
                <div className="bg-green-500"></div>
                <div>
                  <h1 className={styles.chatGroupName}>Gbenga Samuel</h1>
                  <p className={styles.chatMsg}>Lorem ipsum dolor...</p>
                </div>
              </span>
              <span className={styles.chatTime}>
                <h2>11:55AM</h2>
                <div>
                  <h3>2</h3>
                </div>
              </span>
            </div>
            
            <div className={styles.chatMain}>
              <span className={styles.chatUser}>
                <div className="bg-red-500"></div>
                <div>
                  <h1 className={styles.chatGroupName}>Purity Matthew</h1>
                  <p className={styles.chatMsg}>Lorem ipsum dolor...</p>
                </div>
              </span>
              <span className={styles.chatTime}>
                <h2>01:05AM</h2>
                <div>
                  <h3>2</h3>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chatDetails}>
        <div className={styles.chatDetailsHeader}>
          <span>
            <img src="../images/Passport.jpg" />
            <div>
              <h1 className={styles.chatGroupName}>Purity Matthew</h1>
              <span className="flex flex-row items-center">
                <div className={styles.onlineDot}></div>
                <p className={styles.chatMsg}>online</p>
              </span>
            </div>
          </span>
          <span className="flex items-center text-gray-500">
            <BsThreeDots size={"2rem"} />
          </span>
        </div>
        <div className={styles.chatArea}>
          {/* SENDER */}
          <div className={styles.sender}>
            <div>
              <div>
                <h2>Hello bruh! How ur pple dey? Hope say dem dey fine</h2>
              </div>
              <p>12:23PM</p>
            </div>

            <div>
              <div>
                <h2>How things for your side?</h2>
              </div>
              <p>12:25PM</p>
            </div>
          </div>
          {/* RECIPIENT */}
          <div className={styles.recipient}>
            <div>
              <div>
                <h2>I am fine bruh!</h2>
              </div>
              <p>12:24PM</p>
            </div>

            <div>
              <div>
                <h2>My guy e dey God hand like, Thank Him!</h2>
              </div>
              <p>12:26PM</p>
            </div>

            <div>
              <div>
                <h2>Una still dey get light?</h2>
              </div>
              <p>12:27PM</p>
            </div>
          </div>
        </div>
        <div className={styles.chatDetailsFooter}>
          <input type="text" placeholder="Write your message here..." />
          <input type="file" id="attached" hidden />
          <label htmlFor="attached">
            <TiAttachment size={"2rem"} className={styles.attachmentBtn} />
          </label>
          <button className={styles.chatSendBtn}>
            Send <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

"use client";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { socialMap } from "@/data/dataElements";
import { useEffect, useState } from "react";
import { API_HOST } from "@/config";

const Footer = () => {
  const [subscribing, setSubscribing] = useState(false);
  const [message, setMessage] = useState({ success: false, message: "" });
  const [socialHandles, setSocialHandles] = useState([]);

  useEffect(() => {
    async function getSocialHandles() {
      try {
        const res = await fetch(`${API_HOST}/api/v1/social-handles`);
        const repo = await res.json();
        setSocialHandles(repo);
      } catch (e: any) {
        console.log(e.message);
      }
    }
    getSocialHandles();
  }, []);

  const subscribe = async (evt: any) => {
    setSubscribing(true);
    setMessage({ success: false, message: "" });
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    evt?.preventDefault();
    const email = evt.target.email.value;

    if (emailRegex.test(email)) {
      try {
        const subscriptionRequest = await fetch(
          `${API_HOST}/api/v1/subscriptions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          },
        );
        const subscriptionResponse = await subscriptionRequest.json();
        if (subscriptionResponse?.status == false) {
          setMessage({
            success: false,
            message: "Your email is already subscribed.",
          });
        } else {
          setMessage({ success: true, message: "Thank you for subscribing." });
        }
      } catch (e: any) {
        setMessage({ success: true, message: e.message });
      }
    } else {
      setMessage({ success: false, message: "Incorrect email format" });
    }
    setSubscribing(false);
  };
  return (
    <footer>
      <div>
        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 justify-between items-center w-[90vw] lg:w-[70vw] m-auto min-h-[40vh] gap-5 !mt-16"
          }
        >
          <div className={"md:order-none order-2"}>
            <h4 className={"text-xl lg:text-3xl font-bold mb-5"}>
              We only send valuable emails, you are safe from spam emails.
            </h4>
            <p>Go ahead and explore them to find some really cool NFTs.</p>
            <div className={"mt-8"}>
              <form onSubmit={subscribe}>
                <div
                  className={
                    "flex gap-2 justify-between items-center border border-gray-600 rounded-lg p-2"
                  }
                >
                  <input
                    name={"email"}
                    type={"text"}
                    className={
                      "text-sm w-full bg-transparent outline-0 p-3 rounded-lg"
                    }
                    placeholder={"SUBSCRIBE TO OUR NEWSLETTER"}
                  />
                  <button
                    type={"submit"}
                    disabled={subscribing}
                    className={"bg-accent p-3 rounded-lg"}
                  >
                    {subscribing ? (
                      <FiLoader size={22} className="animate-spin" />
                    ) : (
                      <FiArrowRight />
                    )}
                  </button>
                </div>
              </form>
              <p
                className={`${message.success ? "text-accent" : "text-red-500"} mt-3`}
              >
                {message.message}
              </p>
            </div>
          </div>
          <div
            className={
              "flex items-center justify-center relative w-full order-1 md:order-none m-auto text-center"
            }
          >
            <Image
              src={"/assets/images/googlemail.png"}
              width={300}
              height={270}
              alt={""}
            />
          </div>
        </div>
        <div
          className={
            "flex items-center justify-center bg-primary-dark min-h-[200px] py-8 mt-12"
          }
        >
          <div
            className={
              "flex flex-col md:flex-row items-center justify-between w-[90vw] lg:w-[80vw]"
            }
          >
            <Image
              src={"/assets/images/logo.png"}
              alt={""}
              height={90}
              width={250}
            />
            <div className={"flex gap-5 items-center text-white mt-8 lg:mt-0"}>
              {socialHandles.map((social: any, index) => {
                // This is because we didn't build a way to change the social media urls from the Admin. Baran requested for that to be suspended
                return (
                  <Link
                    key={index}
                    target="_blank"
                    href={
                      social.name == "Discord"
                        ? "https://discord.gg/sS5KJeE8Ps"
                        : social.name == "Instagram"
                          ? "https://www.instagram.com/brnmetaverse?igsh=MW80aDgzb3p4a3hwMA=="
                          : social.url
                    }
                  >
                    <Image
                      src={`${API_HOST}${social.icon_path}`}
                      alt={social.name}
                      height={30}
                      width={30}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

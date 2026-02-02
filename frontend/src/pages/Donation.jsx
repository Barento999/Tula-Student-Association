import { useState } from "react";
import PageHeader from "../components/PageHeader";

function Donation() {
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    amount: "",
    customAmount: "",
    donationType: "one-time",
    purpose: "general",
    message: "",
    anonymous: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const donationPurposes = [
    { value: "general", label: "General Support" },
    { value: "materials", label: "Learning Materials" },
    { value: "supplies", label: "School Supplies" },
    { value: "scholarships", label: "Student Scholarships" },
    { value: "infrastructure", label: "Infrastructure" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleAmountSelect = (amount) => {
    setFormData({ ...formData, amount: amount.toString(), customAmount: "" });
    if (errors.amount) {
      setErrors({ ...errors, amount: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.anonymous && !formData.donorName.trim()) {
      newErrors.donorName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    const finalAmount =
      formData.amount === "custom" ? formData.customAmount : formData.amount;
    if (!finalAmount) {
      newErrors.amount = "Please select or enter an amount";
    } else if (parseFloat(finalAmount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Donation submitted:", formData);

    setShowSuccess(true);
    setFormData({
      donorName: "",
      email: "",
      phone: "",
      amount: "",
      customAmount: "",
      donationType: "one-time",
      purpose: "general",
      message: "",
      anonymous: false,
    });

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const getFinalAmount = () => {
    return formData.amount === "custom"
      ? formData.customAmount
      : formData.amount;
  };

  return (
    <div
      style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "40px" }}>
      <PageHeader
        title="Support Our Mission"
        subtitle="Your donation helps us provide quality education to students in Tula Village"
        icon="💝"
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* Impact Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #00A884 0%, #25D366 100%)",
            borderRadius: "12px",
            padding: "40px",
            marginBottom: "40px",
            color: "#fff",
          }}>
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "20px",
              textAlign: "center",
            }}>
            Your Impact
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "30px",
              marginTop: "30px",
            }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}>
                $25
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Provides school supplies for 1 student
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}>
                $50
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Funds learning materials for a class
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}>
                $100
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Supports a student for entire summer
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}>
                $250
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Provides scholarship for 2 students
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
          }}>
          {/* Donation Form */}
          <div
            style={{
              backgroundColor: "#1E2A32",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}>
            <h2
              style={{
                fontSize: "24px",
                marginBottom: "30px",
                color: "#E9EDEF",
              }}>
              Make a Donation
            </h2>

            {showSuccess && (
              <div
                style={{
                  backgroundColor: "#00A884",
                  color: "#fff",
                  padding: "15px 20px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}>
                ✓ Thank you for your generous donation! You will receive a
                confirmation email shortly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Donation Type */}
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Donation Type
                </label>
                <div style={{ display: "flex", gap: "15px" }}>
                  <label
                    style={{
                      flex: 1,
                      padding: "15px",
                      borderRadius: "8px",
                      border: `2px solid ${formData.donationType === "one-time" ? "#25D366" : "#2A3942"}`,
                      backgroundColor:
                        formData.donationType === "one-time"
                          ? "rgba(37, 211, 102, 0.1)"
                          : "#0B141A",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                    }}>
                    <input
                      type="radio"
                      name="donationType"
                      value="one-time"
                      checked={formData.donationType === "one-time"}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <div style={{ color: "#E9EDEF", fontWeight: "500" }}>
                      One-Time
                    </div>
                  </label>
                  <label
                    style={{
                      flex: 1,
                      padding: "15px",
                      borderRadius: "8px",
                      border: `2px solid ${formData.donationType === "monthly" ? "#25D366" : "#2A3942"}`,
                      backgroundColor:
                        formData.donationType === "monthly"
                          ? "rgba(37, 211, 102, 0.1)"
                          : "#0B141A",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                    }}>
                    <input
                      type="radio"
                      name="donationType"
                      value="monthly"
                      checked={formData.donationType === "monthly"}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <div style={{ color: "#E9EDEF", fontWeight: "500" }}>
                      Monthly
                    </div>
                  </label>
                </div>
              </div>

              {/* Amount Selection */}
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Donation Amount ($) *
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                    marginBottom: "15px",
                  }}>
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      style={{
                        padding: "15px",
                        borderRadius: "8px",
                        border: `2px solid ${formData.amount === amt.toString() ? "#25D366" : "#2A3942"}`,
                        backgroundColor:
                          formData.amount === amt.toString()
                            ? "rgba(37, 211, 102, 0.1)"
                            : "#0B141A",
                        color: "#E9EDEF",
                        fontSize: "16px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}>
                      ${amt}
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, amount: "custom" })
                    }
                    style={{
                      padding: "15px 20px",
                      borderRadius: "8px",
                      border: `2px solid ${formData.amount === "custom" ? "#25D366" : "#2A3942"}`,
                      backgroundColor:
                        formData.amount === "custom"
                          ? "rgba(37, 211, 102, 0.1)"
                          : "#0B141A",
                      color: "#E9EDEF",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}>
                    Custom
                  </button>
                  {formData.amount === "custom" && (
                    <input
                      type="number"
                      name="customAmount"
                      value={formData.customAmount}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      min="1"
                      step="0.01"
                      style={{
                        flex: 1,
                        padding: "15px",
                        borderRadius: "8px",
                        border: "2px solid #2A3942",
                        backgroundColor: "#0B141A",
                        color: "#E9EDEF",
                        fontSize: "16px",
                      }}
                    />
                  )}
                </div>
                {errors.amount && (
                  <div
                    style={{
                      color: "#ff6b6b",
                      fontSize: "12px",
                      marginTop: "5px",
                    }}>
                    {errors.amount}
                  </div>
                )}
              </div>

              {/* Donation Purpose */}
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Donation Purpose
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                  }}>
                  {donationPurposes.map((purpose) => (
                    <option key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Anonymous Donation */}
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: "#E9EDEF",
                  }}>
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                    }}
                  />
                  <span>Make this donation anonymous</span>
                </label>
              </div>

              {/* Donor Information */}
              {!formData.anonymous && (
                <div style={{ marginBottom: "25px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      color: "#E9EDEF",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "8px",
                      border: `2px solid ${errors.donorName ? "#ff6b6b" : "#2A3942"}`,
                      backgroundColor: "#0B141A",
                      color: "#E9EDEF",
                      fontSize: "16px",
                    }}
                  />
                  {errors.donorName && (
                    <div
                      style={{
                        color: "#ff6b6b",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}>
                      {errors.donorName}
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "8px",
                    border: `2px solid ${errors.email ? "#ff6b6b" : "#2A3942"}`,
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                  }}
                />
                {errors.email && (
                  <div
                    style={{
                      color: "#ff6b6b",
                      fontSize: "12px",
                      marginTop: "5px",
                    }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#E9EDEF",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}>
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share why you're supporting our mission..."
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "2px solid #2A3942",
                    backgroundColor: "#0B141A",
                    color: "#E9EDEF",
                    fontSize: "16px",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Summary */}
              {getFinalAmount() && (
                <div
                  style={{
                    backgroundColor: "rgba(37, 211, 102, 0.1)",
                    border: "2px solid #25D366",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "25px",
                  }}>
                  <div
                    style={{
                      color: "#E9EDEF",
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}>
                    Donation Summary:
                  </div>
                  <div
                    style={{
                      color: "#25D366",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}>
                    ${getFinalAmount()}{" "}
                    {formData.donationType === "monthly" && "/ month"}
                  </div>
                  <div
                    style={{
                      color: "#8696A0",
                      fontSize: "14px",
                      marginTop: "5px",
                    }}>
                    {
                      donationPurposes.find((p) => p.value === formData.purpose)
                        ?.label
                    }
                  </div>
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "18px",
                  backgroundColor: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#00A884")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "#25D366")
                }>
                Proceed to Payment
              </button>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  color: "#8696A0",
                  fontSize: "12px",
                }}>
                🔒 Secure payment processing • Tax-deductible donation
              </div>
            </form>
          </div>
        </div>

        {/* Why Donate Section */}
        <div
          style={{
            backgroundColor: "#1E2A32",
            borderRadius: "12px",
            padding: "40px",
            marginTop: "40px",
          }}>
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "30px",
              color: "#E9EDEF",
              textAlign: "center",
            }}>
            Why Your Donation Matters
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
            }}>
            <div>
              <div style={{ fontSize: "32px", marginBottom: "15px" }}>📚</div>
              <h3
                style={{
                  color: "#25D366",
                  marginBottom: "10px",
                  fontSize: "18px",
                }}>
                Quality Education
              </h3>
              <p
                style={{
                  color: "#8696A0",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}>
                Your donation provides learning materials, books, and supplies
                to students who need them most.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "32px", marginBottom: "15px" }}>👨‍🏫</div>
              <h3
                style={{
                  color: "#25D366",
                  marginBottom: "10px",
                  fontSize: "18px",
                }}>
                Support Volunteers
              </h3>
              <p
                style={{
                  color: "#8696A0",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}>
                Help cover transportation and materials for university students
                who volunteer their summer.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "32px", marginBottom: "15px" }}>🏘️</div>
              <h3
                style={{
                  color: "#25D366",
                  marginBottom: "10px",
                  fontSize: "18px",
                }}>
                Community Impact
              </h3>
              <p
                style={{
                  color: "#8696A0",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}>
                Strengthen the entire Tula Village community through education
                and support programs.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "32px", marginBottom: "15px" }}>🎓</div>
              <h3
                style={{
                  color: "#25D366",
                  marginBottom: "10px",
                  fontSize: "18px",
                }}>
                Future Leaders
              </h3>
              <p
                style={{
                  color: "#8696A0",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}>
                Invest in the next generation of leaders and change-makers in
                our community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donation;

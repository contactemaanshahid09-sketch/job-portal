// import mongoose from "mongoose";

// const JobSchema = new mongoose.Schema(
//   {
//     // ===== Basic Job Info =====
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     company: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     location: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // ===== Job Details =====
//     salary: {
//       type: String,
//       trim: true,
//     },

//     description: {
//       type: String,
//       trim: true,
//     },

//     startDate: {
//       type: Date,
//     },

//     endDate: {
//       type: Date,
//     },

//     experience: {
//       type: Number, // years
//       min: 0,
//     },

//     status: {
//       type: String,
//       enum: ["Open", "Closed", "Draft"],
//       default: "Open",
//     },

//     type: {
//       type: String,
//       enum: ["Remote", "Hybrid", "Onsite"],
//       default: "Remote",
//     },

//     skills: [
//       {
//         type: String,
//         trim: true,
//       },
//     ],

//     featured: {
//       type: Boolean,
//       default: false,
//     },

//     // ===== Job Applications =====
//     applications: [
//       {
//         userId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },

//         userEmail: {
//           type: String,
//           required: true,
//           trim: true,
//         },

//         appliedAt: {
//           type: Date,
//           default: Date.now,
//         },

//         status: {
//           type: String,
//           enum: ["pending", "reviewed", "rejected", "accepted"],
//           default: "pending",
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true, // createdAt & updatedAt
//   }
// );

// export default mongoose.models.Job || mongoose.model("Job", JobSchema);


import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    // ===== Basic Job Info =====
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    // ===== Job Details =====
    salary: {
      type: String,
      trim: true,
      default: null,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    experience: {
      type: Number,
      min: 0,
      default: null,
    },

    status: {
      type: String,
      enum: ["Open", "Closed", "Draft"],
      default: "Open",
    },

    type: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      default: "Remote",
    },

    skills: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    // ===== Job Applications =====
    applications: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        userEmail: {
          type: String,
          required: true,
          trim: true,
        },

        appliedAt: {
          type: Date,
          default: Date.now,
        },

        status: {
          type: String,
          enum: ["pending", "reviewed", "rejected", "accepted"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);

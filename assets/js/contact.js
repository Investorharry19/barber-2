$(document).ready(function () {
  (function ($) {
    "use strict";

    jQuery.validator.addMethod(
      "answercheck",
      function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      "type the correct answer -_-"
    );

    // validate contactForm form
    $(function () {
      $("#contactForm").validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          subject: {
            required: true,
            minlength: 4,
          },
          number: {
            required: true,
            minlength: 5,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 20,
          },
        },
        messages: {
          name: {
            required: "come on, you have a name, don't you?",
            minlength: "your name must consist of at least 2 characters",
          },
          subject: {
            required: "come on, you have a subject, don't you?",
            minlength: "your subject must consist of at least 4 characters",
          },
          number: {
            required: "come on, you have a number, don't you?",
            minlength: "your Number must consist of at least 5 characters",
          },
          email: {
            required: "no email, no message",
          },
          message: {
            required:
              "um...yea, you have to write something to send this form.",
            minlength: "thats all? really?",
          },
        },
        submitHandler: function (form) {
          console.log("🟡 Form passed validation, sending...");

          // ----------------- AJAX SUBMIT -----------------
          $(form).ajaxSubmit({
            type: "POST",
            data: $(form).serialize(),
            url: "contact_process.php",
            success: function () {
              console.log("✅ AJAX form submitted successfully");

              $("#contactForm :input").attr("disabled", "disabled");
              $("#contactForm").fadeTo("slow", 1, function () {
                $(this).find(":input").attr("disabled", "disabled");
                $(this).find("label").css("cursor", "default");
                $("#success").fadeIn();
                $(".modal").modal("hide");
                $("#success").modal("show");
              });
            },
            error: function () {
              console.error("❌ AJAX form submission failed");
              $("#contactForm").fadeTo("slow", 1, function () {
                $("#error").fadeIn();
                $(".modal").modal("hide");
                $("#error").modal("show");
              });
            },
          });

          // ----------------- SEND TO WHATSAPP -----------------
          const name = $('#contactForm input[name="name"]').val().trim();
          const subject = $('#contactForm input[name="subject"]').val().trim();
          const number = $('#contactForm input[name="number"]').val().trim();
          const email = $('#contactForm input[name="email"]').val().trim();
          const message = $('#contactForm textarea[name="message"]')
            .val()
            .trim();

          const whatsappMessage =
            `*New Contact Form Submission*\n` +
            `👤 Name: ${name}\n` +
            `📞 Phone: ${number}\n` +
            `📧 Email: ${email}\n` +
            `📌 Subject: ${subject}\n` +
            `💬 Message: ${message}`;

          console.log("📨 WhatsApp message prepared:", whatsappMessage);

          // 🔴 Replace with your WhatsApp number (country code + number)
          const whatsappNumber = "2349150424598";

          const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);

          console.log("🚀 Opening WhatsApp URL:", whatsappURL);

          window.open(whatsappURL, "_blank");

          // Optional: reset form after sending
          $(form)[0].reset();
          console.log("🧹 Form cleared after submission");
        },
      });
    });
  })(jQuery);
});

export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });

    }

    try {

        const response = await fetch(

            "https://script.google.com/macros/s/AKfycbyupfrxIgdh3pICuynO5iObqyTIK8jQQLD1pWtzqyjpT6R0UK1fOFYKvdSRt-ABoSc/exec",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(req.body)

            }

        );

        const text = await response.text();

        let result;

        try{

            result = JSON.parse(text);

        }

        catch{

            result = {

                success: true,

                message: text

            };

        }

        return res.status(200).json(result);

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            success:false,

            message:"Unable to contact server."

        });

    }

}

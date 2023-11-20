/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "res.cloudinary.com",
        ]
    }
}

module.exports = {
    webpack:(config) => {
        config.resolve.fallback = {
            "mongodb-client-encryption":false,
            "aws4":false
        }
        return config
    }
}    
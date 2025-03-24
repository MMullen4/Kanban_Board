import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    // try {
    //   // get token from auth header
    //   const authHeader = req.headers['authorization'];
    //   const token = authHeader && authHeader.split(' ')[1];
    //   if (!token) {
    //     return res.status(401).json({ messase: 'No token, auth denied' });
    //   }
    //   // verify token
    //   return jwt.verify(
    //     token,
    //     process.env.JWT_SECRET!,
    //     (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
    //       if (err) {
    //         return res.status(403).json({ message: 'Token is not valid' });
    //       }
    //       // type assertion for decoded payload
    //       const payload = decoded as JwtPayload;
    //       // add user from payload to req obj
    //       req.user = payload;
    //       next(); // called when verified
    //     }
    //   );
    // } catch (error) {
    //   res.status(500).json({
    //     message: 'Server error'
    //   });
    // }
    // return;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        const secretKey = process.env.JWT_SECRET_KEY || "";
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            return next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
};

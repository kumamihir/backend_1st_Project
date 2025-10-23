class Apierror extends Error {
    constructor(
        statuscode,
        message = "Something Went Wrong",
        errors = [],
        stack = "",
    ){
        super(message)
        this.statuscode=statuscode
        this.data = null,
        this.message = message
        this.success = false,
        this.errors = this.errors

    }
}

export {Apierror}